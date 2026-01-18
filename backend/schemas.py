from pydantic import BaseModel
from datetime import date

class OrderCreate(BaseModel):
    customer_name: str
    event_type: str
    event_date: date
    guests_count: int
    menu_type: str
    contact_number: str
    status: str

class Order(OrderCreate):
    id: int

    class Config:
        orm_mode = True
