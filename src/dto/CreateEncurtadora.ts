import { IsNotEmpty } from 'class-validator';

export class CreateEncurtadoraDTO {

  constructor(encurtadora: Partial<CreateEncurtadoraDTO>) {
    this.id = encurtadora?.id;
    this.term_origin = encurtadora?.term_origin;
    this.term_target = encurtadora?.term_target;
  }

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
