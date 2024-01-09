### `npm start`

9/1/24
genie can take only 1 chat until he an
genie can see only few lines at cahts
change button colors to selected page
fix height of topics
chnage the word claim
send emails 



what to test❌✅

1.new user ✅
2.send 3 new messages:(
   
   change user nick, ✅
   avater, ✅
   one with not,✅
   select topic)✅
   no topic✅
  no genie✅
  finish for today✅
  maxt words❌
  remove phone or email
  remove  special char✅✅

3.new genie
select 3 messages only his topics
user can see that was select but it will be HOLD ✅
genew answer with diferent ick name and avatar
max genie post 10 per day
after 10 minutes posts are free
check if every 10 minutes we get new messages

gini see up to 10 new
user see mesages status as his turn

long messages
no phone or email or face book
user name to long
==============================+++++++++++++++++++++++++++++++++++++++++++++++++++++
BAGS
USERS
1. if message to long  it show error.thats ok we must have explenation to user for that

4.לא מוחק מספרי טלפון ולא אימילים דרוש טיפול בשרת
מה קורה אם יוזר עם 2 טלפונים, איך יודע כמה שיחות יש לו
כלומר , בכל קריאה לשרת צריך להוריד ליוזר גם את מספר השיחות להיום
מסך השיחות קצת רחב מידי וחורג ימינה שמאלה     - to check

DELETE  חובה לשים האם אתה בטוח ולצבוע את הלא בכחול
יוזר לוחץ SEND לסגור  SIDEBAR
GENIE
שיחה שגיני בחר לא מצליח היוזר למחוק
3תפריט צדדי לא נסגר שלוחצים על שיחה חדשה
5 שגיני בוחר שיחה לשאול are you sure

7 שיחות בהולד היוזר לא רואה, צריך להראות לו ולהציג  אולי הולד ירוק✅
8 אחרי שגיני מושך שיחה   ולוחץ שןב על חדש השיחה הראשונה שמופיעה היא ריקה ורק אם מדפדף רואה עוד
----------------------------------------------------------------
1 שיחות שגיני בחר הוא אמור לראות עיגול ירוק עם 1 בתוכו
ואם הוא נכנס לתוכה וראה אז ישתנה בDB שהוא קרא ואז ישאר עיגול צבע כתום

יוזר שכותב שיחה צל uder_read
שגיני עונה  צל last = genie
user_read=0
genie_raed=1
גיני אמור להשתנות לחיצים
אצל יוזר אמור להשתנות לירוק עם 2



---------------------------------
genie login ok
logout user ✅
logout genie✅
1.user can add new
2.user add up to 3 new in 24 and it clean at next day
3.genie can see up to 10 each day
4.genie can se and answer
genie message to long
5.user can see and response to genie up to 3
6.user can see history
7/genie can see histopry
8.genie new will be relese after 10 minutes
9.changing image/nickname once in chat before start
10 geneie can have no more than 5 chats open and can get new only if he start answer all that he had???//
genie can unswer up to 3
11remove phone numbers and emails
user can change nick name and image once per conversation(
genie can change image and nick one per conversation

UI
multi dymonds
multi messages
time to get the topics for use

BAGS
1)full url not work http://genieclient.s3-website.eu-central-1.amazonaws.com/logingenie
2)IdToken not delete id storage
3)avatar not delete in ls at logout user and genie
4)user have only 2, but last user post count old date
5)user can not send post IMPORTANT 5. to many dymonds change the width
6/width of login change



important fiture
1.user registration. after user login if forgote password send code to email
2.genie login with email and otp/if forgot p[assword send code to email]
3.genie select topic
4.ai for clean code+ auto topic+remuve abuse
5.user can select topic with emogi
6.user can rate with genie icons
genie can add /change nickname once in chat 11. user/gene can report
7/ginie select topic

good to have
2.email notification for message
3.add mongo db
4.user can close/loack post
5.geneei must answer in 3 days other, this post will move to store and genie will get bad point after 10 bad will get ban

BAGS
1.if not the user turn do not show green light
2.after 24 hores, user steel see only 1 chat left
3after user send message we must have loader
4.all topics must came from local storage
5)important -user see his post we must block the fotter so he cant answer/same for genie
6)when genie answer page shuld return to main then back he can see the page/or stay in page but download the his answer
color at genie of conversation shuld be opocite

logic
at client side:
post_status="new": the user see green new
post_ststus="user_ai" user see orange circle and the post will contain some tect"we chaking the message"
if its not the firs post genie will se arrows
post ststus="genie_ai" genie will see orange circle, user will see arrow

if post_status ="open"> , the client check last_writen_by, if user_1/\_2/\_3 then user see arrows and genie see green
and opocite

if post_status ="closed" bought genie and user no sign

server select only if is_active=1
server insert if active=1 and post_status = new(for genie) or open for bought

user will not select if user_delete=1
genie will not select if genie_delete=1

gine/user report only if post_status=open

post_status:
user_ai>>the post in the que,we will write" the post is in check we will show you later"
at client:cant write,user_see orange

genie_ai >> the same

## new >> the user upload. the post is new, at client user see new, genie can choose

open > one side see arrow the other side that have to write see green
close>> no sign, user or genie can close any time no sign

---

report, no one will see the post(we have to write in comment whe and when)

after report,clodse no one can write anymore/if post in open user can delete for me or for all, after post close, each one can delete for him.genie can alway delete only for him

---

## rubi up to 5

new post, insert to genie_post, status check_user add to table check_posts , user can see but cand do anything color orande, text : post in check
after check, the post move to new
if genie select and write, the post in genie_ai, the message is that in check, genie see orange circle, user can not write yest, user see arrows
after check, genie seee arrows user see gren


genei