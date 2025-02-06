interface IMailerProvider {
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void>
}

export {IMailerProvider}