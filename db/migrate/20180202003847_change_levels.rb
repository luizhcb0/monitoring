class ChangeLevels < ActiveRecord::Migration[5.0]
  def change
    change_table :levels do |t|
      t.change :level, :float, null: true
    end
  end
end
