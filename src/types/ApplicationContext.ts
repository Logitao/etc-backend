import { Request } from 'express'

export interface RequestSession {
    userId: number | string
}

export type Session = {
    session: RequestSession
}

export type Response = {
    clearCookie: (name: string, options?: any) => void
}
export interface ApplicationContext {
    request: Request & Session
    response: Response
}
