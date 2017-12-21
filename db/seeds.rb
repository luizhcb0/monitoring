# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "admin", email: "admin@gmail.com", password: "111111", role: "admin")
User.create(name: "Luiz", email: "luizhcb0@gmail.com", password: "111111", role: "admin")
User.create(name: "Lucas", email: "luccoelhoo@gmail.com", password: "111111", role: "admin")
User.create(name: "Default", email: "default@gmail.com", password: "111111", role: "default")

device1 = Device.create(user_id: 2, serial:"1111-1111-01", model: 0, address: "http://192.168.0.22")
device2 = Device.create(user_id: 2, serial:"1111-1111-02", model: 0, address: "http://192.168.0.22")
device3 = Device.create(user_id: 2, serial:"1111-1111-03", model: 0, address: "http://192.168.0.22")
device4 = Device.create(user_id: 2, serial:"1111-1111-04", model: 0, address: "http://192.168.0.22")
device5 = Device.create(user_id: 3, serial:"1111-1111-05", model: 0, address: "http://192.168.0.22")
device6 = Device.create(user_id: 3, serial:"1111-1111-06", model: 0, address: "http://192.168.0.22")
device7 = Device.create(user_id: 3, serial:"1111-1111-07", model: 0, address: "http://192.168.0.22")
device8 = Device.create(user_id: 3, serial:"1111-1111-08", model: 0, address: "http://192.168.0.22")
device9 = Device.create(serial:"1111-1111-09", model: 0, address: "http://192.168.0.22")
device10 = Device.create(serial:"1111-1111-10", model: 0, address: "http://192.168.0.22")

Dimension.create(x: 2, y: 6, z: 2, device_id: 1)
Dimension.create(x: 2, y: 6, z: 2, device_id: 2)
Dimension.create(x: 2, y: 6, z: 2, device_id: 3)
Dimension.create(x: 2, y: 6, z: 2, device_id: 4)
Dimension.create(x: 2, y: 6, z: 2, device_id: 5)
Dimension.create(x: 2, y: 6, z: 2, device_id: 6)
Dimension.create(x: 2, y: 0.6, z: 0.6, volume: 1000, device_id: 7)
Dimension.create(x: 2, y: 6, z: 2, device_id: 8)

Level.create(device_id: 1, level: 0)
Level.create(device_id: 2, level: 0)
Level.create(device_id: 3, level: 0)
Level.create(device_id: 4, level: 0)
Level.create(device_id: 5, level: 0)
Level.create(device_id: 6, level: 0)
Level.create(device_id: 7, level: 0)
Level.create(device_id: 8, level: 0)
