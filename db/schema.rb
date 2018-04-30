# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180404182912) do

  create_table "atm_pressures", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "device_id",             null: false
    t.float    "data",       limit: 24, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["device_id"], name: "index_atm_pressures_on_device_id", using: :btree
  end

  create_table "contacts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "email"
    t.string   "body"
    t.string   "subject"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "priority",                 default: 0, null: false
    t.integer  "attempts",                 default: 0, null: false
    t.text     "handler",    limit: 65535,             null: false
    t.text     "last_error", limit: 65535
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
  end

  create_table "devices", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "serial",     null: false
    t.integer  "model",      null: false
    t.string   "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dimensions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "device_id"
    t.float    "x",          limit: 24
    t.float    "y",          limit: 24
    t.float    "z",          limit: 24
    t.float    "volume",     limit: 24
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["device_id"], name: "index_dimensions_on_device_id", using: :btree
  end

  create_table "email_logs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id",       null: false
    t.integer  "device_id",     null: false
    t.integer  "new_level_id",  null: false
    t.integer  "last_level_id", null: false
    t.integer  "alert_type",    null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["device_id"], name: "index_email_logs_on_device_id", using: :btree
    t.index ["last_level_id"], name: "index_email_logs_on_last_level_id", using: :btree
    t.index ["new_level_id"], name: "index_email_logs_on_new_level_id", using: :btree
    t.index ["user_id"], name: "index_email_logs_on_user_id", using: :btree
  end

  create_table "humidities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "device_id",             null: false
    t.float    "data",       limit: 24, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["device_id"], name: "index_humidities_on_device_id", using: :btree
  end

  create_table "levels", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "device_id",             null: false
    t.float    "level",      limit: 24
    t.float    "y",          limit: 24
    t.float    "percentage", limit: 24
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["device_id"], name: "index_levels_on_device_id", using: :btree
  end

  create_table "luminosities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "device_id",             null: false
    t.float    "data",       limit: 24, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["device_id"], name: "index_luminosities_on_device_id", using: :btree
  end

  create_table "settings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.float    "alert_level", limit: 24
    t.boolean  "active",                 default: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "theme",                  default: 1
    t.index ["user_id"], name: "index_settings_on_user_id", using: :btree
  end

  create_table "temperatures", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "device_id",             null: false
    t.float    "data",       limit: 24, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["device_id"], name: "index_temperatures_on_device_id", using: :btree
  end

  create_table "user_devices", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id",             null: false
    t.integer  "device_id",           null: false
    t.datetime "last_critical_level"
    t.string   "description"
    t.index ["device_id"], name: "index_user_devices_on_device_id", using: :btree
    t.index ["user_id", "device_id"], name: "index_user_devices_on_user_id_and_device_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_user_devices_on_user_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",                              default: "", null: false
    t.string   "email",                             default: "", null: false
    t.string   "encrypted_password",                default: "", null: false
    t.integer  "role",                              default: 1,  null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "authentication_token",   limit: 30
    t.string   "phone"
    t.string   "time_zone"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "atm_pressures", "devices", on_delete: :cascade
  add_foreign_key "dimensions", "devices", on_delete: :cascade
  add_foreign_key "humidities", "devices", on_delete: :cascade
  add_foreign_key "levels", "devices", on_delete: :cascade
  add_foreign_key "luminosities", "devices", on_delete: :cascade
  add_foreign_key "settings", "users", on_delete: :cascade
  add_foreign_key "temperatures", "devices", on_delete: :cascade
  add_foreign_key "user_devices", "devices", on_delete: :cascade
  add_foreign_key "user_devices", "users", on_delete: :cascade
end
