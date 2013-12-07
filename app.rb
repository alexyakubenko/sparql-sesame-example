require 'sinatra'
require 'haml'
require 'sass/plugin/rack'
require 'active_support/core_ext'
require 'sparql/client'

use Sass::Plugin::Rack

sparql_client = SPARQL::Client.new('http://stage.f5screening.com:8080/openrdf-sesame/repositories/iips?queryLn=SPARQL')

get '/' do
  haml :index
end

post '/query' do
  Hash[sparql_client.query(params[:q]).bindings.map { |k, v| [k, v.map(&:object)] }].to_json
end