import { Controller, Get } from 'routing-controllers'

@Controller()
export class MainController {
    @Get('/')
    main() {
        return "Click <a href=\"/auth/login\">here</a> to log in with Spotify"
    }
}
