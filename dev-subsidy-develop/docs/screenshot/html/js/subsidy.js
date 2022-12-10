$(function () {

    const controlInfos = [
        { "stepId": "step1", "sectionId": "s1", "nextButtonId": "next1", "prevButtonId": null },
        { "stepId": "step2", "sectionId": "s2", "nextButtonId": "next2", "prevButtonId": "prev2" },
        { "stepId": "step3", "sectionId": "s3", "nextButtonId": "next3", "prevButtonId": "prev3" },
        { "stepId": "step4", "sectionId": "s4", "nextButtonId": "next4", "prevButtonId": "prev4" },
        { "stepId": "step5", "sectionId": "s5", "nextButtonId": "next5", "prevButtonId": "prev5" },
        { "stepId": "step6", "sectionId": "s6", "nextButtonId": "next6", "prevButtonId": "prev6" },
        { "stepId": "step7", "sectionId": "s7", "nextButtonId": "next7", "prevButtonId": "prev7" },
        { "stepId": "step8", "sectionId": "s8", "nextButtonId": "next8", "prevButtonId": "prev8" },
        { "stepId": "step9", "sectionId": "s9", "nextButtonId": "next9", "prevButtonId": "prev9" },
    ];

    const nextStepMap = makeNextStepMap();
    const prevStepMap = makePrevStepMap();

    activeByStepId("step1");

    controlInfos.forEach((info) => {
        if (info.nextButtonId !== null) {
            $("#" + info.nextButtonId).click(onNextClick);
        }
        if (info.prevButtonId !== null) {
            $("#" + info.prevButtonId).click(onPrevClick);
        }
    });

    function makeNextStepMap() {
        const map = {};
        let lastNextId = null;
        controlInfos.forEach((info) => {
            if (lastNextId !== null) {
                map[lastNextId] = info.stepId;
            }
            lastNextId = info.nextButtonId;
        });
        return map;
    }

    function makePrevStepMap() {
        const map = {};
        let lastStepId = null;
        controlInfos.forEach((info) => {
            if (lastStepId !== null) {
                map[info.prevButtonId] = lastStepId;
            }
            lastStepId = info.stepId;
        });
        return map;
    }

    function onNextClick(e) {
        activeByStepId(nextStepMap[e.currentTarget.id]);
    }

    function onPrevClick(e) {
        activeByStepId(prevStepMap[e.currentTarget.id]);
    }

    function activeByStepId(id) {
        let isCompleted = true;
        controlInfos.forEach((info) => {
            const stepElement = $("#" + info.stepId);
            const sectionElement = $("#" + info.sectionId);
            if (id === info.stepId) {
                isCompleted = false;
                stepElement.addClass("active");
                stepElement.removeClass("completed");
                sectionElement.show();
            } else if (isCompleted) {
                stepElement.removeClass("active");
                stepElement.addClass("completed");
                sectionElement.hide();
            } else {
                stepElement.removeClass("active");
                stepElement.removeClass("completed");
                sectionElement.hide();
            }
        });
    }
});
