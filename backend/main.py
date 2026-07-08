from __future__ import annotations

from typing import Dict, List, Optional

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column
from sqlalchemy.dialects.sqlite import JSON
from sqlmodel import Field, Session, SQLModel, create_engine, select


class Survey(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    street: str
    city: str
    state: str
    zip: str
    phone: str
    email: str
    url: str = ""
    date: str
    interests: Dict[str, bool] = Field(default_factory=dict, sa_column=Column(JSON))
    heardFrom: str = ""
    gradMonth: str = ""
    gradYear: str = ""
    recommendation: str = ""


sqlite_file_name = "surveys.db"
sqlite_url = f"sqlite:///./{sqlite_file_name}"
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

app = FastAPI(title="SWE645 Survey API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup() -> None:
    SQLModel.metadata.create_all(engine)


@app.post("/surveys", response_model=Survey, status_code=201)
def create_survey(survey: Survey) -> Survey:
    with Session(engine) as session:
        survey_db = Survey.model_validate(survey)
        session.add(survey_db)
        session.commit()
        session.refresh(survey_db)
        return survey_db


@app.get("/surveys", response_model=List[Survey])
def list_surveys() -> List[Survey]:
    with Session(engine) as session:
        surveys = session.exec(select(Survey).order_by(Survey.id.desc())).all()
        return surveys


@app.put("/surveys/{survey_id}", response_model=Survey)
def update_survey(survey_id: int, survey_update: Survey) -> Survey:
    with Session(engine) as session:
        survey_db = session.get(Survey, survey_id)

        update_data = survey_update.model_dump(exclude={"id"})
        for key, value in update_data.items():
            setattr(survey_db, key, value)

        session.add(survey_db)
        session.commit()
        session.refresh(survey_db)
        return survey_db


@app.delete("/surveys/{survey_id}", status_code=204, response_class=Response)
def delete_survey(survey_id: int) -> Response:
    with Session(engine) as session:
        survey_db = session.get(Survey, survey_id)

        session.delete(survey_db)
        session.commit()

    return Response(status_code=204)
