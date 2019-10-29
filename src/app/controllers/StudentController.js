import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, nome, email, idade, peso, altura } = await Student.create(
      req.body
    );

    return res.json({
      id,
      nome,
      email,
      idade,
      peso,
      altura,
    });
  }

  async update(req, res) {
    const { email } = req.body;
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists' });
    }

    const verificarEmailExistente = await Student.findOne({
      where: { email },
    });

    if (verificarEmailExistente) {
      if (verificarEmailExistente.id != req.params.id) {
        return res
          .status(401)
          .json({ error: 'Email already exists in other student.' });
      }
    }

    const { nome, idade, peso, altura } = await student.update(req.body);

    return res.json({
      nome,
      email,
      idade,
      peso,
      altura,
    });
  }
}

export default new StudentController();
