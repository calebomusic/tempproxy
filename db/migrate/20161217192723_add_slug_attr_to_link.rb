class AddSlugAttrToLink < ActiveRecord::Migration
  def change
    add_column :temp_links, :slug, :string
  end
end
