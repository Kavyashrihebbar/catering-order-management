from sqlalchemy import Column, Integer, String, Date
from database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    event_date = Column(Date, nullable=False)
    guests_count = Column(Integer, nullable=False)
    menu_items = Column(String, nullable=False)
    amount = Column(Integer, nullable=False)
    contact_number = Column(String, nullable=False)
    status = Column(String, nullable=False)
