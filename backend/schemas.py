from pydantic import BaseModel
from datetime import date

class OrderCreate(BaseModel):
    customer_name: str
    event_date: date
    guests_count: int
    menu_items: str
    amount: int
    contact_number: str
    status: str

class OrderResponse(OrderCreate):
    id: int

    class Config:
        from_attributes = True
