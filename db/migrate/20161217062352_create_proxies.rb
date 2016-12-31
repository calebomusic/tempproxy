class CreateProxies < ActiveRecord::Migration
  def change
    create_table :proxies do |t|
      t.string :destination_url, null: false
      t.integer :lifespan, null: false
      t.timestamps
    end
  end
end
