import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import { app } from './app'

app.listen(3333, () => {
  console.log('server started!');
})