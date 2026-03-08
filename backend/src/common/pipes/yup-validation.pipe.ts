import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<any>) {}

  transform(value: unknown): any {
    try {
      const validatedValue = this.schema.validateSync(value, {
        abortEarly: false,
        stripUnknown: true,
      });

      return validatedValue;
    } catch (error: any) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors:
          error.inner?.map((e: any) => ({
            field: e.path,
            message: e.message,
          })) || error.message,
      });
    }
  }
}
