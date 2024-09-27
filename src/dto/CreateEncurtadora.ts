import { IsNotEmpty } from 'class-validator';

export class CreateEncurtadoraDTO {
  id?: string;

  @IsNotEmpty({
    message: 'informe o termo de origem',
  })
  term_origin: string;

  @IsNotEmpty({
    message: 'informe o termo/url de destino',
  })
  term_target: string;
}
