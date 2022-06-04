
import _ from 'underscore'

exports.provider = {
    name: 'Edward Tesoura',
    email: 'edward@maosdetesoura.com',
    password: 'senha123',
    is_provider: true
}

exports.cliente = {
    name: 'Seu Barriga',
    email: 'barriga@televisa.com',
    password: 'pwd1234',
    is_provider: false

}

exports.horadoagendamento = {
    hora: _.sample(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'])
}
