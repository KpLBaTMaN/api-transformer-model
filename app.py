import uvicorn
import webbrowser

from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import time


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/process_request/")
async def process_request(request: str = Form(...)):
    
    # Simulate a delay to show the loading screen
    time.sleep(3)

    # Perform processing on the request
    processed_request = f"You entered: {request}"
    return {"processed_request": processed_request}


# Run the FastAPI application using uvicorn
if __name__ == "__main__":
    # Automatically open the application in the browser
    webbrowser.open("http://localhost:8000")

    uvicorn.run(app, host="localhost", port=8000)