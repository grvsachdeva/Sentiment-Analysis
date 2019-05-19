# -*- coding: utf-8 -*-
import scrapy


class HindustantimesSpider(scrapy.Spider):
    name = 'hindustantimes'
    allowed_domains = ['hindustantimes.com']

    def __init__(self, *args, **kwargs):
        super(HindustantimesSpider,
              self).__init__(*args, **kwargs)
        self.start_urls = [kwargs.get('search_url')]

    def parse(self, response):
        urls = response.css(
            'div.media-heading a::attr(href)').extract()
        for url in urls:
            yield(scrapy.Request(url=url, callback=self.parse_article))

    def parse_article(self, response):
        title = response.css('h1::text').extract_first()
        content = response.css('.story-details p::text').extract()
        article = ''.join(content)
        yield({
            'title': title,
            'text': article
        })
