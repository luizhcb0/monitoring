class CreateEmailLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :email_logs do |t|
      t.belongs_to :user, null: false
      t.belongs_to :device, null: false
      t.belongs_to :new_level, null: false
      t.belongs_to :last_level, null: false
      t.integer :alert_type, null: false
      t.timestamps
    end
  end
end
