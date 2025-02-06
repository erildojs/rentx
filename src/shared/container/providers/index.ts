import { container } from "tsyringe";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailerProvider } from "./MailProvider/IMailerProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";



container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

container.registerInstance<IMailerProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)