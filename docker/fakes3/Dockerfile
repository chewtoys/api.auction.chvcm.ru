FROM ruby:2

RUN gem install fakes3 && \
    mkdir -p /mnt/fakes3_root

CMD exec fakes3 -r /mnt/fakes3_root -p 4567 --license fuck_you_super_source

EXPOSE 4567
