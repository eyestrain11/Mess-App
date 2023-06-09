import React from "react";
import rules from '../../Svg/book.png';
function Rules() {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-5 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          <div className="py-8 flex flex-wrap-reverse md:flex-nowrap ">
            <div className="md:flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 title-font mb-3 ">
                <img
                  src={rules}
                  alt=""
                  className="h-[50px] w-[50px] inline mr-2"
                />
                Rules
              </h1>
              <div className="border-1 border-black rounded-xl p-5  bg-gray-200 shadow-xl">
                <ol>
                  <li className="list-disc text-lg mb-3">
                    The menu of the mess should be prepared by the prefects in
                    consultation of the Warden. The menu so specified by the
                    mess prefects will be duly approved by the Secretary, to
                    have an effective control over the cost.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    In case of students who do not use mess facility for 3
                    continuous days or more or going home during college
                    vacation, with prior intimation, concession may be given by
                    the Warden.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    No food will be reserved for the late comers.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    The Mess rates will be calculated on the basis of dividing
                    system & the same will be announced on the notice board
                    every month. The hostelites Mess attendance , corresponding
                    expenditure for every month with balance at their credit
                    will also be displayed by the authorities.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    Food will not be supplied to hostel rooms except to sick
                    students, with the permission of the Warden and only sick
                    diet (i.e. milk and bread) will be supplied. Used utensils
                    shall be return to the mess immediately by the hostelite.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    The boarders should produce identity cards whenever the mess
                    supervisor/security feels to identify them before taking
                    food.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    Except Mess prefects, other hostelites are forbidden to
                    enter the kitchen. They should treat all the the Mess
                    workers with courtesy. Manhandling of any staff or using
                    abusive language against them will end in the expulsion of
                    the student from the hostel immediately after due enquiry.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    No student/prefect has any right to appoint or dispense with
                    service of any staff member of the mess.
                  </li>
                  <li className="list-disc text-lg mb-3">
                    Students who absent themselves on the date of reopening of
                    the college after any semester vacation will be deemed to
                    have joined the mess wherein they dined during the previous
                    semester and will be charged accordingly.
                  </li>
                </ol>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rules;
