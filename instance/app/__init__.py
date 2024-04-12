import hug
from handlers import test, app
from hug_middleware_cors import CORSMiddleware

api = hug.API(__name__)
api.http.add_middleware(CORSMiddleware(api))

@hug.extend_api("")
def api():
    return [test, app]

