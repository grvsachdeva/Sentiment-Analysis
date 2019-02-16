# -*- coding: utf-8 -*-
import scrapy
import pdb


class ArticlesSpider(scrapy.Spider):
    name = 'articles'
    allowed_domains = ['medium.com']

    def __init__(self, *args, **kwargs):
        super(ArticlesSpider, self).__init__(*args, **kwargs)
        self.start_urls = [kwargs.get('search_url')]

    def parse(self, response):
        urls = response.css(
            'div.postArticle-content>a[data-action="open-post"]::attr(href)').extract()
        for url in urls:
            yield(scrapy.Request(url=url, callback=self.parse_article))

    def parse_article(self, response):
        title = response.css('h1::text').get()
        content = response.css('.sectionLayout--insetColumn ::text').extract()
        article = ''.join(content)
        yield({
            'title': title,
            'text': article
        })
