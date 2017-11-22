class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|
      t.belongs_to :user, index: true, foreign_key: {on_delete: :nullify}
      t.string :serial, null: false
      t.integer :model, null: false
      t.string :address
      t.integer :position
      t.string :description
      t.timestamps
    end
  end
end
