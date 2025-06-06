import * as emailService from '../../services/emailService.js';

jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: jest.fn().mockResolvedValue({ response: 'Email sent' }),
  }),
}));

describe('Email Service', () => {
  it('should send an email', async () => {
    await expect(emailService.sendEmail('to@mail.com', 'Subject', 'Text', '<b>HTML</b>')).resolves.not.toThrow();
  });
});
