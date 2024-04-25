from openai import OpenAI

client= OpenAI(api_key='')


messages = []
system_msg = "Du bist ein Therapieunterstützungstool, das Gespräche mit Patienten oder Patientinnen führt. Diese Patienten oder Patientinnen weisen kognitive Verzerrungen (Beck 1976) auf. Du versuchst, bestmöglich auf die Aussagen des Patienten oder der Patientin im Sinne eines sokratischen Dialogs einzugehen. Achtest dabei vor allem auf eine empathische und wertungsfreie Grundhaltung sowie auf therapeutische Qualitätsstandards im Sinne der kognitiven Umstrukturierung. Dadurch sollst du den dysfunktionalen Gedanken zu einem funktionalen Gedanken umstrukturieren"
messages.append({"role": "system", "content": system_msg})

print("Your new assistant is ready! Say hi")
msg="";
n=0;
while input != "quit()":
    tmp=[]
    
    message = input()
    msg=msg+"  Patient:"+message+"  ";
    tmp=messages[:];
    tmp.append({"role": "user", "content": msg})
    response = client.chat.completions.create(
    model="ft:gpt-3.5-turbo-1106:personal::8p2K32Em",
    messages=tmp,
    temperature=1,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    reply = str(response.choices[0].message.content)
    n=n+1
    if n == 3:
        messages.append({"role": "user", "content": msg})
        messages.append({"role": "assistant", "content": reply})
        msg=""
        n=0;
    else:
        msg= msg+ " Therapeut"+reply;

    print("\n TheraBuddy : " + reply + "\n")
