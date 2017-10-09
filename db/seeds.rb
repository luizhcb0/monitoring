# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

device1 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "top", order: 1)
device2 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "top", order: 2)
device3 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "top", order: 3)
device4 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "top", order: 4)
device5 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "bottom", order: 1)
device6 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "bottom", order: 2)
device7 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "bottom", order: 3)
device8 = Device.create(resolution: 3, address: "http://192.168.0.22", position: "bottom", order: 4)


Level.create(device_id: 1, level: 0)
Level.create(device_id: 2, level: 0)
Level.create(device_id: 3, level: 0)
Level.create(device_id: 4, level: 0)
Level.create(device_id: 5, level: 0)
Level.create(device_id: 6, level: 0)
Level.create(device_id: 7, level: 0)
Level.create(device_id: 8, level: 0)