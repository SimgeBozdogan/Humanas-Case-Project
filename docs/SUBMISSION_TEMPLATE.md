# Submission write-up

Copy this file, fill it in, and submit it alongside your code. Short,
specific answers are better than long, general ones.

## 1. The gaps you filled in

The brief left three things unspecified: required vs. optional fields,
whether repeat links are reused or reissued, and the shape of the
shareable ID. Walk us through the calls you made on each, and why.

_Your answer:_ I think the Name, Headline, and Skills fields should be required in a profile. The Bio field is not a must-have.
If there is a profile with the same Name, Headline, Skills and Bio fields, I don't create a new profile. I reuse the existing id for this.
The method I used is cryptographically secure and completely URL-friendly unique IDs for the shareable profile links. I specifically used the base64url format to ensure the generated random ID doesn't contain any special characters that could break web addresses.

## 2. What's next

If you had one more day on this, what's the first thing you'd do, and
why that thing first?

_Your answer:_
If I had one more day, the first thing I would do is implement update and delete functionalities for the profiles.
I would prioritize this because currently, the API only allows creating and viewing profiles. Giving users full control over their own data allowing them to edit their information or permanently remove their profile is the most essential next step to make this a complete, realistic, and user-friendly application.

## 3. AI tools

Did you use AI tools while building this (Copilot, ChatGPT, Claude,
etc.)? If yes — what did you use them for, and was there anything an AI
suggested that you changed or rejected, and why? If no, that's fine —
just say so.

_Your answer:_ I used Claude. Because at first, when I was writing the GET endpoint, I wrote two endpoints. One was returning the data as JSON and the other as HTML. But then I thought this might be a bit unnecessary, and I thought doing this with a single endpoint would make more sense and prevent code duplication. I got help from Claude on how I could do this. Claude suggested I write an endpoint that returns the data in the desired format by using a 'type' query parameter. This way, I was able to build a more flexible structure.

## 4. Optional — skip freely, no penalty either way

If Humanas had to onboard 10,000 new profiles overnight and only had
capacity to manually review 1% of them, how would you decide which 1%?
There's no single right answer here — we're curious how you think, not
what you conclude.

_Your answer:_
I would approach this by setting up an automated scoring system, rather than just picking profiles at random. The system would quickly scan every new account for red flags such as suspicious IP activity, spam keywords, or fake names. We would then focus our manual review strictly on the 1% of profiles with the highest scores. The remaining 99% would be automatically approved, but I would make sure we have a reporting feature in place. That way, the community can easily flag any bad profiles that happen to slip through the initial filter.