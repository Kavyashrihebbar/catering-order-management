from sqlalchemy import Column, Integer, String, Date
from database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    event_type = Column(String)
    event_date = Column(Date)
    guests_count = Column(Integer)
    menu_type = Column(String)
    contact_number = Column(String)
    status = Column(String)
