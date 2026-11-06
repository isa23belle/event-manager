const express = require('express');
const { Event, Registration } = require('./models');
const { validateEvent, validateRegistration } = require('./validators');

const router = express.Router();

// Criar evento
router.post('/events', validateEvent, async (req, res) => {
  // #swagger.tags = ['Events']
  // #swagger.description = 'Cria um novo evento'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados do evento',
        required: true,
        schema: {
          title: 'Palestra',
          date: '2026-12-01',
          capacity: 2
        }
  } */
  // #swagger.responses[201] = { description: 'Evento criado' }
  // #swagger.responses[400] = { description: 'Dados inválidos' }
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar evento', error: err.message });
  }
});

// Listar eventos (com contagem de inscrições)
router.get('/events', async (req, res) => {
  // #swagger.tags = ['Events']
  // #swagger.description = 'Lista todos os eventos com a contagem de inscrições'
  // #swagger.responses[200] = { description: 'Lista de eventos' }
  try {
    const events = await Event.findAll({ include: Registration });

    const result = events.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      capacity: e.capacity,
      registrationsCount: e.Registrations.length,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar eventos', error: err.message });
  }
});

// Inscrever participante
router.post('/events/:id/register', validateRegistration, async (req, res) => {
  // #swagger.tags = ['Registrations']
  // #swagger.description = 'Inscreve um participante em um evento'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados do participante',
        required: true,
        schema: {
          participantName: 'Ana',
          email: 'ana@email.com'
        }
  } */
  // #swagger.responses[201] = { description: 'Inscrição criada' }
  // #swagger.responses[403] = { description: 'Evento lotado' }
  // #swagger.responses[404] = { description: 'Evento não encontrado' }
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    const count = await Registration.count({ where: { eventId: event.id } });

    if (count >= event.capacity) {
      return res.status(403).json({ message: 'Evento lotado' });
    }

    const registration = await Registration.create({
      participantName: req.body.participantName,
      email: req.body.email,
      eventId: event.id,
    });

    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar', error: err.message });
  }
});

module.exports = router;