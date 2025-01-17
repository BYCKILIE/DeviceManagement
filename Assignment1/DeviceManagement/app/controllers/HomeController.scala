package controllers

import javax.inject._
import play.api.mvc._

@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  def index(): Action[AnyContent] = Action { _ =>
    Ok("<h1>Devices Management Microservice</h1>").as("text/html")
  }
}
