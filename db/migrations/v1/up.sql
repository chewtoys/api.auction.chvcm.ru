--  ____                 __                        ____    _____   __
-- /\  _`\              /\ \__                    /\  _`\ /\  __`\/\ \
-- \ \ \L\ \___     ____\ \ ,_\    __   _ __    __\ \,\L\_\ \ \/\ \ \ \
--  \ \ ,__/ __`\  /',__\\ \ \/  /'_ `\/\`'__\/'__`\/_\__ \\ \ \ \ \ \ \  __
--   \ \ \/\ \L\ \/\__, `\\ \ \_/\ \L\ \ \ \//\  __/ /\ \L\ \ \ \\'\\ \ \L\ \
--    \ \_\ \____/\/\____/ \ \__\ \____ \ \_\\ \____\\ `\____\ \___\_\ \____/
--     \/_/\/___/  \/___/   \/__/\/___L\ \/_/ \/____/ \/_____/\/__//_/\/___/
--                                 /\____/                           v11/2NF
--                                 \_/__/                Font Name: Larry 3D

----------------------------------------------------------------------------
--                                                                        --
--                         TYPES (LANGUAGE_CODE)                          --
--                                                                        --
----------------------------------------------------------------------------

ALTER TYPE LANGUAGE_CODE RENAME TO LANGUAGE_CODE_v0;

-- Language code (ISO 639-1)
CREATE TYPE LANGUAGE_CODE AS ENUM (
  'aa',
  'ab',
  'ae',
  'af',
  'ak',
  'am',
  'an',
  'ar',
  'as',
  'av',
  'ay',
  'az',
  'ba',
  'be',
  'bg',
  'bh',
  'bi',
  'bm',
  'bn',
  'bo',
  'br',
  'bs',
  'ca',
  'ce',
  'ch',
  'co',
  'cr',
  'cs',
  'cu',
  'cv',
  'cy',
  'da',
  'de',
  'dv',
  'dz',
  'ee',
  'el',
  'en',
  'eo',
  'es',
  'et',
  'eu',
  'fa',
  'ff',
  'fi',
  'fj',
  'fo',
  'fr',
  'fy',
  'ga',
  'gd',
  'gl',
  'gn',
  'gu',
  'gv',
  'ha',
  'he',
  'hi',
  'ho',
  'hr',
  'ht',
  'hu',
  'hy',
  'hz',
  'ia',
  'id',
  'ie',
  'ig',
  'ii',
  'ik',
  'io',
  'is',
  'it',
  'iu',
  'ja',
  'jv',
  'ka',
  'kg',
  'ki',
  'kj',
  'kk',
  'kl',
  'km',
  'kn',
  'ko',
  'kr',
  'ks',
  'ku',
  'kv',
  'kw',
  'ky',
  'la',
  'lb',
  'lg',
  'li',
  'ln',
  'lo',
  'lt',
  'lu',
  'lv',
  'mg',
  'mh',
  'mi',
  'mk',
  'ml',
  'mn',
  'mr',
  'ms',
  'mt',
  'my',
  'na',
  'nb',
  'nd',
  'ne',
  'ng',
  'nl',
  'nn',
  'no',
  'nr',
  'nv',
  'ny',
  'oc',
  'oj',
  'om',
  'or',
  'os',
  'pa',
  'pi',
  'pl',
  'ps',
  'pt',
  'qu',
  'rm',
  'rn',
  'ro',
  'ru',
  'rw',
  'sa',
  'sc',
  'sd',
  'se',
  'sg',
  'si',
  'sk',
  'sl',
  'sm',
  'sn',
  'so',
  'sq',
  'sr',
  'ss',
  'st',
  'su',
  'sv',
  'sw',
  'ta',
  'te',
  'tg',
  'th',
  'ti',
  'tk',
  'tl',
  'tn',
  'to',
  'tr',
  'ts',
  'tt',
  'tw',
  'ty',
  'ug',
  'uk',
  'ur',
  'uz',
  've',
  'vi',
  'vo',
  'wa',
  'wo',
  'xh',
  'yi',
  'yo',
  'za',
  'zh',
  'zu'
  );

DROP VIEW employees;
DROP VIEW entities;

DROP FUNCTION employees_insert_update_delete_trigger();
DROP FUNCTION entities_insert_update_delete_trigger();

ALTER TABLE users_common
  ALTER COLUMN language TYPE LANGUAGE_CODE USING (
    CASE language::TEXT
      WHEN 'fl' THEN 'en'
      ELSE language::TEXT END)
    ::LANGUAGE_CODE;

DELETE
FROM stuff_translations
WHERE code = 'fl';

ALTER TABLE stuff_translations
  ALTER COLUMN code TYPE LANGUAGE_CODE USING code::TEXT::LANGUAGE_CODE;

DROP TYPE LANGUAGE_CODE_v0;

----------------------------------------------------------------------------
--                                                                        --
--                           TYPES (CURRENCY)                             --
--                                                                        --
----------------------------------------------------------------------------

ALTER TYPE CURRENCY RENAME TO CURRENCY_v0;

-- Currency (ISO 4217:2015)
CREATE TYPE CURRENCY AS ENUM (
  'aed',
  'afn',
  'all',
  'amd',
  'ang',
  'aoa',
  'ars',
  'aud',
  'awg',
  'azn',
  'bam',
  'bbd',
  'bdt',
  'bgn',
  'bhd',
  'bif',
  'bmd',
  'bnd',
  'bob',
  'bov',
  'brl',
  'bsd',
  'btn',
  'bwp',
  'byn',
  'bzd',
  'cad',
  'cdf',
  'che',
  'chf',
  'chw',
  'clf',
  'clp',
  'cny',
  'cop',
  'cou',
  'crc',
  'cuc',
  'cup',
  'cve',
  'czk',
  'djf',
  'dkk',
  'dop',
  'dzd',
  'egp',
  'ern',
  'etb',
  'eur',
  'fjd',
  'fkp',
  'gbp',
  'gel',
  'ghs',
  'gip',
  'gmd',
  'gnf',
  'gtq',
  'gyd',
  'hkd',
  'hnl',
  'hrk',
  'htg',
  'huf',
  'idr',
  'ils',
  'inr',
  'iqd',
  'irr',
  'isk',
  'jmd',
  'jod',
  'jpy',
  'kes',
  'kgs',
  'khr',
  'kmf',
  'kpw',
  'krw',
  'kwd',
  'kyd',
  'kzt',
  'lak',
  'lbp',
  'lkr',
  'lrd',
  'lsl',
  'lyd',
  'mad',
  'mdl',
  'mga',
  'mkd',
  'mmk',
  'mnt',
  'mop',
  'mru',
  'mur',
  'mvr',
  'mwk',
  'mxn',
  'mxv',
  'myr',
  'mzn',
  'nad',
  'ngn',
  'nio',
  'nok',
  'npr',
  'nzd',
  'omr',
  'pab',
  'pen',
  'pgk',
  'php',
  'pkr',
  'pln',
  'pyg',
  'qar',
  'ron',
  'rsd',
  'rub',
  'rwf',
  'sar',
  'sbd',
  'scr',
  'sdg',
  'sek',
  'sgd',
  'shp',
  'sll',
  'sos',
  'srd',
  'ssp',
  'stn',
  'svc',
  'syp',
  'szl',
  'thb',
  'tjs',
  'tmt',
  'tnd',
  'top',
  'try',
  'ttd',
  'twd',
  'tzs',
  'uah',
  'ugx',
  'usd',
  'usn',
  'uyi',
  'uyu',
  'uyw',
  'uzs',
  'ves',
  'vnd',
  'vuv',
  'wst',
  'xaf',
  'xag',
  'xau',
  'xba',
  'xbb',
  'xbc',
  'xbd',
  'xcd',
  'xdr',
  'xof',
  'xpd',
  'xpf',
  'xpt',
  'xsu',
  'xts',
  'xua',
  'xxx',
  'yer',
  'zar',
  'zmw',
  'zwl'
  );

ALTER TABLE lots
  ALTER COLUMN currency TYPE CURRENCY USING (
    CASE currency::text
      WHEN 'vef' THEN 'ves'
      ELSE currency::text END)
    ::CURRENCY;

DROP TYPE CURRENCY_v0;

----------------------------------------------------------------------------
--                                                                        --
--                         TABLES (tokens_tfa_otp)                        --
--                                                                        --
----------------------------------------------------------------------------

-- One-time password type
CREATE TYPE OTP_TYPE AS ENUM ('authenticator');

-- Two-factor authentication one-time password tokens
CREATE TABLE tokens_tfa_otp
(
  userid BIGINT REFERENCES users_common (id)
    ON DELETE CASCADE ON UPDATE CASCADE PRIMARY KEY, -- user id
  type   OTP_TYPE NOT NULL,                          -- token type
  token  TEXT     NOT NULL                           -- token
);

INSERT INTO tokens_tfa_otp(userid, type, token)
SELECT id as userid, 'authenticator' as type, authenticator as token
FROM users_common
WHERE authenticator IS NOT NULL
ORDER BY userid;

----------------------------------------------------------------------------
--                                                                        --
--                          TABLES (users_common)                         --
--                                                                        --
----------------------------------------------------------------------------

ALTER TABLE users_common
  DROP COLUMN authenticator;

ALTER TABLE users_common
  ALTER COLUMN tfa SET DEFAULT FALSE;

ALTER TABLE users_common
  ALTER COLUMN banned SET DEFAULT FALSE;

ALTER TABLE users_common
  ALTER COLUMN registration SET DEFAULT NOW();

----------------------------------------------------------------------------
--                                                                        --
--                        TABLES (users_employees)                        --
--                                                                        --
----------------------------------------------------------------------------

ALTER TABLE users_employees
  ALTER COLUMN admin SET DEFAULT FALSE;

ALTER TABLE users_employees
  ALTER COLUMN moderator SET DEFAULT FALSE;

ALTER TABLE users_employees
  DROP CONSTRAINT users_employees_userid_fkey;

ALTER TABLE users_employees
  ADD CONSTRAINT users_employees_userid_fkey
    FOREIGN KEY (userid) REFERENCES users_common
      ON DELETE CASCADE ON UPDATE CASCADE;

----------------------------------------------------------------------------
--                                                                        --
--                        TABLES (users_entities)                         --
--                                                                        --
----------------------------------------------------------------------------

ALTER TABLE users_entities
  ALTER COLUMN verified SET DEFAULT FALSE;

ALTER TABLE users_entities
  DROP CONSTRAINT users_entities_userid_fkey;

ALTER TABLE users_entities
  ADD CONSTRAINT users_entities_userid_fkey
    FOREIGN KEY (userid) REFERENCES users_common
      ON DELETE CASCADE ON UPDATE CASCADE;

----------------------------------------------------------------------------
--                                                                        --
--                     TABLES (tokens_tfa_purgatory)                      --
--                                                                        --
----------------------------------------------------------------------------

ALTER TABLE tokens_tfa_purgatory
  DROP CONSTRAINT tokens_tfa_purgatory_userid_fkey;

ALTER TABLE tokens_tfa_purgatory
  ADD CONSTRAINT tokens_tfa_purgatory_userid_fkey
    FOREIGN KEY (userid) REFERENCES users_common
      ON DELETE CASCADE ON UPDATE CASCADE;

----------------------------------------------------------------------------
--                                                                        --
--                      TABLES (tokens_tfa_recovery)                      --
--                                                                        --
----------------------------------------------------------------------------

ALTER TABLE tokens_tfa_recovery
  DROP CONSTRAINT tokens_tfa_recovery_userid_fkey;

ALTER TABLE tokens_tfa_recovery
  ADD CONSTRAINT tokens_tfa_recovery_userid_fkey
    FOREIGN KEY (userid) REFERENCES users_common
      ON DELETE CASCADE ON UPDATE CASCADE;

----------------------------------------------------------------------------
--                                                                        --
--                     TABLES (tokens_password_reset)                     --
--                                                                        --
----------------------------------------------------------------------------

ALTER TABLE tokens_password_reset
  DROP CONSTRAINT tokens_password_reset_userid_fkey;

ALTER TABLE tokens_password_reset
  ADD CONSTRAINT tokens_password_reset_userid_fkey
    FOREIGN KEY (userid) REFERENCES users_common
      ON DELETE CASCADE ON UPDATE CASCADE;

----------------------------------------------------------------------------
--                                                                        --
--                            TABLES (stuffs)                             --
--                                                                        --
----------------------------------------------------------------------------

ALTER TYPE LOT_AMOUNT_TYPE RENAME TO AMOUNT_TYPE;

ALTER TABLE stuffs
  ADD amount_type AMOUNT_TYPE DEFAULT 'kg' NOT NULL;

ALTER TABLE stuffs
  ALTER COLUMN amount_type DROP DEFAULT;

----------------------------------------------------------------------------
--                                                                        --
--                      TABLES (stuff_translations)                       --
--                                                                        --
----------------------------------------------------------------------------

DROP INDEX gin_index_stuff_translations_translation;

ALTER TABLE stuff_translations
  RENAME COLUMN translation TO title;

ALTER TABLE stuff_translations
  ALTER COLUMN title TYPE TEXT USING (title::JSON ->> 'title')::TEXT;

ALTER TABLE stuff_translations
  ADD description TEXT DEFAULT '' NOT NULL;

ALTER TABLE stuff_translations
  DROP CONSTRAINT stuff_translations_stuffid_fkey;

ALTER TABLE stuff_translations
  ADD CONSTRAINT stuff_translations_stuffid_fkey
    FOREIGN KEY (stuffid) REFERENCES stuffs
      ON DELETE CASCADE ON UPDATE CASCADE;

----------------------------------------------------------------------------
--                                                                        --
--                             TABLES (lots)                              --
--                                                                        --
----------------------------------------------------------------------------

ALTER TABLE lots
  DROP COLUMN amount_type;

ALTER TABLE lots
  ADD strict BOOLEAN DEFAULT FALSE NOT NULL;

ALTER TABLE lots
  ALTER COLUMN strict DROP DEFAULT;

DROP TRIGGER lots_update_trigger ON lots;

DROP FUNCTION lots_update_trigger();

----------------------------------------------------------------------------
--                                                                        --
--                              DROP TABLES                               --
--                                                                        --
----------------------------------------------------------------------------

DROP TABLE attachments;
DROP TABLE tokens_tfa_email;

----------------------------------------------------------------------------
--                                                                        --
--                                 VIEWS                                  --
--                                                                        --
----------------------------------------------------------------------------

-- Employees
CREATE VIEW employees AS
SELECT users_common.id,
       users_common.name,
       users_common.email,
       users_common.phone,
       users_common.password,
       users_common.tfa,
       users_common.language,
       users_common.banned,
       users_common.registration,
       users_employees.admin,
       users_employees.moderator
FROM users_common
       INNER JOIN users_employees ON users_common.id = users_employees.userid
WHERE users_common.type = 'employee';

-- Entities
CREATE VIEW entities AS
SELECT users_common.id,
       users_common.name,
       users_common.email,
       users_common.phone,
       users_common.password,
       users_common.tfa,
       users_common.language,
       users_common.banned,
       users_common.registration,
       users_entities.ceo,
       users_entities.psrn,
       users_entities.itn,
       users_entities.verified
FROM users_common
       INNER JOIN users_entities ON users_common.id = users_entities.userid
WHERE users_common.type = 'entity';

----------------------------------------------------------------------------
--                                                                        --
--                               FUNCTIONS                                --
--                                                                        --
----------------------------------------------------------------------------

-- Insert/Update/Delete realisation for Employees view
CREATE FUNCTION employees_insert_update_delete_trigger()
  RETURNS TRIGGER AS
$$
BEGIN
  IF (TG_OP = 'INSERT')
  THEN
    NEW.id = CASE
               WHEN NEW.id iS NULL
                 THEN nextval('users_common_id_seq' :: REGCLASS)
               ElSE NEW.id END;
    NEW.tfa = CASE
                WHEN NEW.tfa iS NULL
                  THEN FALSE
                ElSE NEW.tfa END;
    NEW.banned = CASE
                   WHEN NEW.banned iS NULL
                     THEN FALSE
                   ElSE NEW.banned END;
    NEW.registration = CASE
                         WHEN NEW.registration iS NULL
                           THEN NOW()
                         ElSE NEW.registration END;
    NEW.admin = CASE
                  WHEN NEW.admin iS NULL
                    THEN FALSE
                  ElSE NEW.admin END;
    NEW.moderator = CASE
                      WHEN NEW.moderator iS NULL
                        THEN FALSE
                      ElSE NEW.moderator END;
    INSERT INTO users_common (id, name, email, phone, password, tfa, language, banned, type, registration)
    VALUES (NEW.id,
            NEW.name,
            NEW.email,
            NEW.phone,
            NEW.password,
            NEW.tfa,
            NEW.language,
            NEW.banned,
            'employee',
            NEW.registration);
    INSERT INTO users_employees (userid, admin, moderator) VALUES (NEW.id, NEW.admin, NEW.moderator);
    RETURN NEW;
  ELSIF (TG_OP = 'UPDATE')
  THEN
    UPDATE users_common
    SET id           = NEW.id,
        name         = NEW.name,
        email        = NEW.email,
        phone        = NEW.phone,
        password     = NEW.password,
        tfa          = NEW.tfa,
        language     = NEW.language,
        banned       = NEW.banned,
        registration = NEW.registration
    WHERE id = OLD.id;
    UPDATE users_employees
    SET admin     = NEW.admin,
        moderator = NEW.moderator
    WHERE userid = NEW.id;
    RETURN NEW;
  ELSE
    DELETE FROM users_common WHERE id = OLD.id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$
  LANGUAGE plpgsql;

-- Insert/Update/Delete realisation for Entities view
CREATE FUNCTION entities_insert_update_delete_trigger()
  RETURNS TRIGGER AS
$$
BEGIN
  IF (TG_OP = 'INSERT')
  THEN
    NEW.id = CASE
               WHEN NEW.id iS NULL
                 THEN nextval('users_common_id_seq' :: REGCLASS)
               ElSE NEW.id END;
    NEW.tfa = CASE
                WHEN NEW.tfa iS NULL
                  THEN FALSE
                ElSE NEW.tfa END;
    NEW.banned = CASE
                   WHEN NEW.banned iS NULL
                     THEN FALSE
                   ElSE NEW.banned END;
    NEW.registration = CASE
                         WHEN NEW.registration iS NULL
                           THEN NOW()
                         ElSE NEW.registration END;
    NEW.verified = CASE
                     WHEN NEW.verified iS NULL
                       THEN FALSE
                     ElSE NEW.verified END;
    INSERT INTO users_common (id, name, email, phone, password, tfa, language, banned, type, registration)
    VALUES (NEW.id,
            NEW.name,
            NEW.email,
            NEW.phone,
            NEW.password,
            NEW.tfa,
            NEW.language,
            NEW.banned,
            'entity',
            NEW.registration);
    INSERT INTO users_entities (userid, ceo, psrn, itn, verified)
    VALUES (NEW.id, NEW.ceo, NEW.psrn, NEW.itn, NEW.verified);
    RETURN NEW;
  ELSIF (TG_OP = 'UPDATE')
  THEN
    UPDATE users_common
    SET id           = NEW.id,
        name         = NEW.name,
        email        = NEW.email,
        phone        = NEW.phone,
        password     = NEW.password,
        tfa          = NEW.tfa,
        language     = NEW.language,
        banned       = NEW.banned,
        registration = NEW.registration
    WHERE id = OLD.id;
    UPDATE users_entities
    SET ceo      = NEW.ceo,
        psrn     = NEW.psrn,
        itn      = NEW.itn,
        verified = NEW.verified
    WHERE userid = NEW.id;
    RETURN NEW;
  ELSE
    DELETE FROM users_common WHERE id = OLD.id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$
  LANGUAGE plpgsql;

-- Lot before update logic
CREATE FUNCTION lots_before_update_trigger()
  RETURNS TRIGGER AS
$$
DECLARE
  _now    TIMESTAMPTZ;
  _buffer INTERVAL;
BEGIN
  IF (NEW.winner IS NULL OR NEW.winbid IS NULL)
  THEN
    NEW.winbid = OLD.winbid;
    NEW.winner = OLD.winner;
    RETURN NEW;
  END IF;
  IF (NEW."strict")
  THEN
    IF (OLD.winbid IS NULL)
    THEN
      NEW.winbid = NEW.startbid;
    ELSEIF (NEW.type = 'sale')
    THEN
      NEW.winbid = OLD.winbid + NEW.step;
    ELSEIF (NEW.type = 'purchase')
    THEN
      NEW.winbid = OLD.winbid - NEW.step;
    END IF;
  END IF;
  IF (NEW.winbid < 0)
  THEN
    NEW.winbid = 0;
  END IF;
  _now = NOW();
  _buffer = abs_interval(NEW.buffer);
  INSERT INTO lot_participants (lotid, userid) VALUES (NEW.id, NEW.winner) ON CONFLICT DO NOTHING;
  SELECT COUNT(*) FROM lot_participants WHERE lotid = NEW.id INTO NEW.participants;
  IF (NEW.type = 'sale' AND (OLD.winbid IS NULL AND NEW.winbid < NEW.startbid OR
                             OLD.winbid IS NOT NULL AND NEW.winbid < OLD.winbid + NEW.step) OR
      NEW.type = 'purchase' AND (OLD.winbid IS NULL AND NEW.winbid > NEW.startbid OR
                                 OLD.winbid IS NOT NULL AND NEW.winbid > OLD.winbid - NEW.step) OR
      NEW.winbid = OLD.winbid)
  THEN
    NEW.winbid = OLD.winbid;
    NEW.winner = OLD.winner;
  ELSEIF (NEW.finish - _now < _buffer)
  THEN
    NEW.finish = _now + _buffer;
  END IF;
  RETURN NEW;
END;
$$
  LANGUAGE plpgsql;

----------------------------------------------------------------------------
--                                                                        --
--                                TRIGGERS                                --
--                                                                        --
----------------------------------------------------------------------------

CREATE TRIGGER employees_insert_update_delete_trigger
  INSTEAD OF INSERT OR UPDATE OR DELETE
  ON employees
  FOR EACH ROW
EXECUTE PROCEDURE employees_insert_update_delete_trigger();

CREATE TRIGGER entities_insert_update_delete_trigger
  INSTEAD OF INSERT OR UPDATE OR DELETE
  ON entities
  FOR EACH ROW
EXECUTE PROCEDURE entities_insert_update_delete_trigger();

CREATE TRIGGER lots_before_update_trigger
  BEFORE UPDATE
  ON lots
  FOR EACH ROW
EXECUTE PROCEDURE lots_before_update_trigger();

--                             _.-----.._____,-~~~~-._...__
--                          ,-'            /         `....
--                        ,'             ,'      .  .  \::.
--                      ,'        . ''    :     . \  `./::..
--                    ,'    ..   .     .      .  . : ;':::.
--                   /     :go. :       . :    \ : ;'.::.
--                   |     ' .o8)     .  :|    : ,'. .
--                  /     :   ~:'  . '   :/  . :/. .
--                 /       ,  '          |   : /. .
--                /       ,              |   ./.
--                L._    .       ,' .:.  /  ,'.
--               /-.     :.--._,-'~~~~~~| ,'|:
--              ,--.    /   .:/         |/::| `.
--              |-.    /   .;'      .-__)::/    \
-- ...._____...-|-.  ,'  .;'      .' '.'|;'      |
--   ~--..._____\-_-'  .:'      .'   /  '
--    ___....--~~   _.-' `.___.'   ./
--      ~~------+~~_. .    ~~    .,'
--                  ~:_.' . . ._:'   _ Seal _
--                     ~~-+-+~~
