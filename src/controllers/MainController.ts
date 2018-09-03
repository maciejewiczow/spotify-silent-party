import { Controller, Get } from 'routing-controllers'

@Controller()
export class MainController {
    @Get('/')
    main() {}
}
