require 'capybara/rspec'
require 'capybara/poltergeist'

require_relative '../server'

Capybara.javascript_driver = :poltergeist

RSpec.configure do |config|
  config.include Capybara::DSL
end
