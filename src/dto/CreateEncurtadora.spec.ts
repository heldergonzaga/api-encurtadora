
import { validate } from 'class-validator';
import { CreateEncurtadoraDTO } from './CreateEncurtadora';

describe('CreateEncurtadoraDTO', () => {
  it('should fail validation if term_origin is empty', async () => {
    const dto = new CreateEncurtadoraDTO({
      term_origin: '', // Campo vazio
      term_target: 'http://example.com',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const termOriginError = errors.find(
      (error) => error.property === 'term_origin',
    );
    expect(termOriginError).toBeDefined();
    expect(termOriginError.constraints?.isNotEmpty).toEqual(
      'informe o termo de origem',
    );
  });

  it('should fail validation if term_target is empty', async () => {
    const dto = new CreateEncurtadoraDTO({
      term_origin: 'example',
      term_target: '', // Campo vazio
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const termTargetError = errors.find(
      (error) => error.property === 'term_target',
    );
    expect(termTargetError).toBeDefined();
    expect(termTargetError.constraints?.isNotEmpty).toEqual(
      'informe o termo/url de destino',
    );
  });

  it('should pass validation if both term_origin and term_target are provided', async () => {
    const dto = new CreateEncurtadoraDTO({
      term_origin: 'example',
      term_target: 'http://example.com',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Nenhum erro esperado
  });
});
