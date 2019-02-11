# -*- coding: utf-8 -*-
import scrapy, pdb, sys


class GizmodoSpider(scrapy.Spider):
    name = 'gizmodo'
    allowed_domains = ['gizmodo.com']
    
    def __init__(self, *args, **kwargs): 
      super(GizmodoSpider, self).__init__(*args, **kwargs) 
      self.start_urls = [kwargs.get('search_url')]

    def parse(self, response):
        urls = response.css('.headline>a::attr(href)').extract()
        for url in urls:
            yield(scrapy.Request(url=url, callback=self.parse_article))

    def parse_article(self, response):
        headline = response.css('h1.headline>a::text').extract()
        content = response.css('div.post__content-wrapper p::text').extract()
        yield({
            'title': ''.join(headline),
            'text': ''.join(content)
        })
