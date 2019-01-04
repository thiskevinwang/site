import React from "react";
import {
  Markdown,
  Schedule as ScheduleComp,
  ScheduleLegend,
  connect,
} from "components";

const Schedule = ({ conference }) => {
  if (!conference) {
    return null;
  }
  return (
    <>
      <section className="intro intro_schedule">
        <div className="intro--main">
          <Markdown
            source={`The schedule of the event has been carefully curated. In true Finnish style, we rather focus on quality than quantity. There is no call for papers and the speakers have been chosen with care.

[Subscribe to the conference calendar](https://api.react-finland.fi/calendar/react-finland-2019). You can import it to your Google Calendar for example.
`}
          />
        </div>
        <aside className="intro--aside" />
      </section>
      <div className="grid--5col grid--full-mobile" id="schedule">
        {conference.schedules && <ScheduleLegend />}
        {conference.schedules.map(({ day, description, intervals }) => (
          <React.Fragment key={day}>
            <h2>
              {day} {" - "} {description}
            </h2>
            <ScheduleComp intervals={intervals} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ({ conferenceId }) =>
  connect(
    `
query PageQuery($conferenceId: ID!) {
  conference(id: $conferenceId) {
    schedules {
      day
      description
      intervals {
        begin
        end
        title
        sessions {
          type
          interval {
            begin
            end
          }
          title
          description

          ... on Workshop {
            speakers {
              name
              image {
                url
              }
            }
          }
          ... on Talk {
            speakers {
              name
              image {
                url
              }
            }
          }
        }
      }
    }
  }
}
`,
    () => ({
      conferenceId,
    })
  )(Schedule);
