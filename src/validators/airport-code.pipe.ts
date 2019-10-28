import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AirportCodePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || !value.match(/^\s*[a-z]{3}\s*$/i)) {
      throw new BadRequestException('Invalid airport code');
    }

    return value.trim().toUpperCase();
  }
}
