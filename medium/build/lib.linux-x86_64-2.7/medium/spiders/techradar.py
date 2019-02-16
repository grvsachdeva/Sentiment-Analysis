# -*- coding: utf-8 -*-
import scrapy


class TechradarSpider(scrapy.Spider):
    name = 'techradar'
    allowed_domains = ['techradar.com']

    def __init__(self, *args, **kwargs):
        super(TechradarSpider, self).__init__(*args, **kwargs)
        self.start_urls = [kwargs.get('search_url')]

    def parse(self, response):
        urls = response.css('div.listingResult>a::attr(href)').extract()
        print(len(urls))
        for url in urls:
            yield(scrapy.Request(url=url, callback=self.parse_article))

    def parse_article(self, response):
        title = response.css('header>h1::text').extract_first()
        content = response.css('div#article-body p::text').extract()
        article = ''.join(content)
        yield({
            'title': title,
            'text': article
        })
