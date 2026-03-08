import type { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export function getValidationPipeConfig(): ValidationPipeOptions {
  return {
    whitelist: true,
    transform: true,
  };
}
