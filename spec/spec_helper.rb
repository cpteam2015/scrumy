require 'capybara/rspec'
require 'capybara/poltergeist'

require_relative '../app'

Capybara.javascript_driver = :poltergeist

RSpec.configure do |config|
  config.include Capybara::DSL
end
