# -*- coding: utf-8 -*-
import scrapy, pdb, sys


class GizmodoSpider(scrapy.Spider):
    name = 'gizmodo'
    allowed_domains = ['gizmodo.com']
    start_urls = ['https://gizmodo.com/search?q=']
    
    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url+self.search, dont_filter=True)

    def parse(self, response):
        if self.search_url is not None:
            self.start_urls = self.search_url

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
