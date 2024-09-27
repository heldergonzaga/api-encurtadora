import { CreateEncurtadoraDTO } from 'src/dto/CreateEncurtadora';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class EncurtadoraRepository {
  abstract create(term_origin: string, term_target: string): Promise<void>;
  abstract findOne(term_origin: string): Promise<void>;
  abstract findAll(): any;
  abstract update(term_origin: string, data: CreateEncurtadoraDTO);
  abstract remove(id: string);
}
