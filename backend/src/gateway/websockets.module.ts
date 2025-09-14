import { forwardRef, Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { AuthModule } from 'src/auth/auth.module';


@Module({
   imports: [forwardRef(() => AuthModule)],
  providers: [WebsocketsGateway],
  exports:[WebsocketsGateway]
})
export class WebsocketsGatewayModule {}