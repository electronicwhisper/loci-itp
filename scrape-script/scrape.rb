# use with
# ruby scrape.rb > ../js/projectsDB.js

require "rubygems"
require "nokogiri"
require "open-uri"
require "json"


class Nokogiri::XML::Node
  def stringify
    serialize(:encoding => 'UTF-8')
  end
end
class Nokogiri::XML::NodeSet
  def stringify
    map { |x| x.stringify }.join
  end
end

module Fetch
  def self.fetch(url)
    html = Nokogiri::HTML(open(url))
    yield(html)
  end
end


def getUrls
  Fetch.fetch("http://itp.nyu.edu/shows/spring2012/category/projects/") do |html|
    html.xpath("//*[@class='post']//a[not(contains(@href, 'category'))]").map do |link|
      link["href"]
    end
  end
end

def processProject(url)
  Fetch.fetch(url) do |html|
    page = {
      "title" => html.xpath("//*[@class='projectTitle']/text()").stringify.strip,
      "author" => html.xpath("//*[@class='projectAuthor']").inner_html.strip.split("<br>").join(", "),
      "pitch" => html.xpath("//*[@class='projectPitch']/text()").stringify.strip,
      "url" => html.xpath("//*[@class='projectURL']/a/text()").stringify.strip,
      "image" => html.xpath("//*[@id='projectImage']/img"),
      "more" => html.xpath("//*[@class='storycontent']").inner_html.strip
    }
    
    # link to the project page if it doesn't have a valid url
    unless page["url"].include? "http" and page["url"].include? "."
      page["url"] = url
    end
    
    if page["image"] and page["image"][0] and page["image"][0]["src"]
      page["image"] = page["image"][0]["src"]
    else
      page["image"] = "images/none.png"
    end
    
    return page
  end
end


urls = getUrls()

# urls = urls[0..1]

pages = urls.map do |url|
  processProject(url)
end

puts "var projectsDB = " + pages.to_json + ";"


# These are for testing:

# p getUrls()
# p urls

# p processProject("http://itp.nyu.edu/shows/spring2012/googlebooth/")
# p processProject("http://itp.nyu.edu/shows/spring2012/burritob0t/")