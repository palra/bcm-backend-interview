import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AirlineCodePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || !value.match(/^\s*[a-z]{2}\s*$/i)) {
      throw new BadRequestException('Invalid airline code');
    }

    return value.trim().toUpperCase();
  }
}
