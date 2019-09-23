class Recipe < ApplicationRecord
    has_attached_file :featured_image, styles: { medium: "300x300>", thumb: "100x100>" }
    validates_attachment_content_type :featured_image, content_type: /\Aimage\/.*\z/

    belongs_to :user
end
